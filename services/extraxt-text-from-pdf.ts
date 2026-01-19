import fs from "fs";
import PDFParser from "pdf2json";

export type PdfExtractResult = {
    success: boolean;
    text: string | null;
    error?: string;
};

export async function extractTextFromPdf(
    filepath: string
): Promise<PdfExtractResult> {
    return new Promise((resolve) => {
        if (!fs.existsSync(filepath)) {
            return resolve({
                success: false,
                text: null,
                error: "File does not exist"
            });
        }

        const pdfParser = new PDFParser(null, true);

        pdfParser.on("pdfParser_dataError", (errData : any) => {
            resolve({
                success: false,
                text: null,
                error: errData?.parserError|| "PDF parsing failed"
            });
        });

        pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
            try {
                let text = "";

                for (const page of pdfData.Pages) {
                    if (!page.Texts) continue;
                    
                    for (const textItem of page.Texts) {
                        if (!textItem.R) continue;
                        
                        for (const run of textItem.R) {
                            try {
                                // Safely decode URI components, fallback to raw text if decoding fails
                                const decodedText = decodeURIComponent(run.T);
                                text += decodedText + " ";
                            } catch (decodeError) {
                                // If decoding fails, try to use the raw text
                                // Replace common encoded characters manually
                                let rawText = run.T || "";
                                rawText = rawText
                                    .replace(/%20/g, " ")
                                    .replace(/%2C/g, ",")
                                    .replace(/%2E/g, ".")
                                    .replace(/%40/g, "@")
                                    .replace(/%2F/g, "/")
                                    .replace(/%3A/g, ":")
                                    .replace(/%28/g, "(")
                                    .replace(/%29/g, ")")
                                    .replace(/%2D/g, "-")
                                    .replace(/%5F/g, "_");
                                text += rawText + " ";
                            }
                        }
                    }
                    text += "\n";
                }

                if (!text.trim()) {
                    return resolve({
                        success: false,
                        text: null,
                        error: "No text found in PDF"
                    });
                }

                resolve({
                    success: true,
                    text: text.trim()
                });
            } catch (error) {
                resolve({
                    success: false,
                    text: null,
                    error: error instanceof Error ? error.message : "Failed to extract text"
                });
            }
        });

        pdfParser.loadPDF(filepath);
    });
}
