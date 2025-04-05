import jsPDF from "jspdf";

export async function POST(request: Request) {
  const { contract } = await request.json();

  try {
    let cid = "";
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    const maxWidth = pageWidth - 2 * margin; // Prevents text from going off the edge
    const lineHeight = 10;
    let y = margin;

    // Split text into lines that fit within the page width
    const lines = doc.splitTextToSize(contract, maxWidth);

    // Loop through lines and add them to the PDF
    lines.forEach((line: string) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage(); // Add new page when reaching the bottom
        y = margin; // Reset y position
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    // Save locally
    doc.save("WFH-agreement.pdf");

    // Convert to Blob for IPFS
    const pdfBlob = new Blob([doc.output("blob")], { type: "application/pdf" });

    const JWT = process.env.PINATA_JWT;

    try {
      const blob = new Blob([pdfBlob], { type: "application/pdf" });
      const file = new File([blob], "contract.txt");
      const data = new FormData();
      data.append("file", file);

      const request = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
          body: data,
        }
      );
      const response = await request.json();
      console.log(response);
      console.log(response.IpfsHash);

      cid = response.IpfsHash;
    } catch {
      console.log("IPFS ERROR");
    }

    return Response.json(cid);
  } catch (error) {
    console.error("Resend error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
