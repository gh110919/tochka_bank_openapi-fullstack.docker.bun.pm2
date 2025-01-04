import axios from "axios";
import { parsed } from "../main";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = {
  Data: {
    permissions: string[];
    expirationDateTime?: string;
  };
};

type TResponse = {
  Data: {
    status: string;
    creationDateTime: string;
    statusUpdateDateTime: string;
    permissions: string[];
    expirationDateTime: any;
    consentId: string;
    customerCode: any;
    applicationName: any;
    consumerId: string;
    clientId: any;
  };
  Links: {
    self: string;
  };
  Meta: {
    totalPages: number;
  };
};

type TParams<T> = Partial<{
  access_token: string;
  data: T;
}>;
/* Задайте разрешения */
export const setPermissions = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { access_token, data } = params!;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/${apiVersion}/consents`;

  const headers = {
    Authorization: `Bearer ${access_token}`,
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
