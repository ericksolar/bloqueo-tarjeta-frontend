/**
 * Generador mínimo de PDF (una página A4, texto + líneas), sin dependencias.
 * Soporta tildes y ñ usando WinAnsiEncoding.
 */

const PAGE_W = 595.28;
const PAGE_H = 841.89;

/** Escapa el texto para un string PDF y codifica caracteres latinos en octal. */
function pdfString(text) {
  let out = "";
  for (const ch of text) {
    const code = ch.charCodeAt(0);
    if (ch === "(" || ch === ")" || ch === "\\") out += `\\${ch}`;
    else if (code > 126 && code < 256) out += `\\${code.toString(8).padStart(3, "0")}`;
    else if (code >= 256) out += "?";
    else out += ch;
  }
  return `(${out})`;
}

function rgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => (v / 255).toFixed(3)).join(" ");
}

export class SimplePdf {
  ops = [];

  /** y se mide desde arriba de la página. */
  text(x, y, value, { size = 11, bold = false, color = "#383838" } = {}) {
    this.ops.push(
      `BT ${rgb(color)} rg /${bold ? "F2" : "F1"} ${size} Tf ${x} ${(PAGE_H - y).toFixed(2)} Td ${pdfString(value)} Tj ET`,
    );
    return this;
  }

  line(x1, y, x2, { color = "#E6E6E6", width = 1 } = {}) {
    this.ops.push(
      `${rgb(color)} RG ${width} w ${x1} ${(PAGE_H - y).toFixed(2)} m ${x2} ${(PAGE_H - y).toFixed(2)} l S`,
    );
    return this;
  }

  rect(x, y, w, h, color) {
    this.ops.push(`${rgb(color)} rg ${x} ${(PAGE_H - y - h).toFixed(2)} ${w} ${h} re f`);
    return this;
  }

  toBlob() {
    const content = this.ops.join("\n");
    const objects = [
      "<< /Type /Catalog /Pages 2 0 R >>",
      "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
      `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    ];

    let pdf = "%PDF-1.4\n";
    const offsets = [];
    objects.forEach((obj, i) => {
      offsets.push(pdf.length);
      pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
    });
    const xref = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    pdf += offsets.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("");
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;

    // Todo el contenido es ASCII (los acentos van escapados en octal).
    return new Blob([pdf], { type: "application/pdf" });
  }

  download(filename) {
    const url = URL.createObjectURL(this.toBlob());
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
