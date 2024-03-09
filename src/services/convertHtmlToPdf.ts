import type { ConvertToPdfRequest, ConvertToPdfResponse } from '../types/convertToPdfType';

export async function convertHtmlToPdf(request : ConvertToPdfRequest): Promise<ConvertToPdfResponse> {
  let errorMessage: string = '';
  try {
    const response = await fetch(import.meta.env.VITE_CONVERT_TO_PDF, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    });

    if (response.ok) {
      const pdfBlob = await response.blob(); 
      const successResponse: ConvertToPdfResponse = {
        file: pdfBlob,
        error: {
          isError: false,
          errorMessage: ''
        }
      };
      return successResponse;
    } else {
      errorMessage = `Error fetching data. Status: ${response.status}`;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    errorMessage = `Error fetching data. Status: ${error}`;
  }

  const invalidResponse: ConvertToPdfResponse = {
    file: new Blob(), 
    error: {
      isError: true,
      errorMessage: errorMessage
    }
  };
  return invalidResponse;
};

