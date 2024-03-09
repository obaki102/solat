export interface ConvertToPdfRequest  {
  htmlContent:string;
  fileName: string;
 
};

export interface ConvertToPdfResponse {
  file: Blob; 
  error: {
    isError: boolean;
    errorMessage: string;
  };
}
