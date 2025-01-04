import axios from "axios";
import { parsed } from "src/backend/main";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = {
  Data: {
    email: string;
  };
};

type TResponse = {
  Data: {
    result: boolean;
  };
  Links: {
    self: string;
  };
  Meta: {
    totalPages: number;
  };
};

type TParams<T> = Partial<{
  customerCode: string;
  documentId: string;
  data: T;
}>;
/* Метод отправки закрывающего документа на почту */
export const sendClosingDocumentsToEmail = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { customerCode, documentId, data } = params!;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/invoice/${apiVersion}/closing-documents/${customerCode}/${documentId}/email`;

  const headers = {
    Authorization: `Bearer ${parsed?.JWT_KEY_TOKEN}`,
  };

  try {
    return {
      success: true,
      message: await axios.post(url, data, { headers }),
    };
  } catch (error) {
    return {
      success: false,
      message: error as any,
    };
  }
};
