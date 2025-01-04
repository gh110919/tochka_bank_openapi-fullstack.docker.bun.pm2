import { Router } from "express";
import { checkAccessToken } from "../oauth/check-access-token";
import { exchangeCodeAccess } from "../oauth/exchange-code-access";
import { exchangeRefreshToken } from "../oauth/exchange-refresh-token";
import { getTokenPermissions } from "../oauth/get-token-permissions";
import { requestSignPermissions } from "../oauth/request-sign-permissions";
import { setPermissions } from "../oauth/set-permissions";

export const router = ((router): Router => {
  return router
    .post("/get_token_permissions", async (req, res) => {
      const { client_id, client_secret } = req.body;

      const payload = await getTokenPermissions({
        client_id,
        client_secret,
      });

      try {
        if (payload.success) {
          res.status(200).json({
            success: true,
            message: payload.message.data,
          });
        }
      } catch (error) {
        console.error(error);

        res.status(500).json({
          success: false,
          message: error as string,
        });
      }
    })
    .post("/set_permissions", async (req, res) => {
      const { access_token, data } = req.body;

      const payload = await setPermissions({ access_token, data });

      try {
        if (payload.success) {
          res.status(200).json({
            success: true,
            message: payload.message.data,
          });
        }
      } catch (error) {
        console.error(error);

        res.status(500).json({
          success: false,
          message: error as string,
        });
      }
    })
    .post("/request_sign_permissions", async (req, res) => {
      const { client_id, client_secret, consent_id, redirect_url } = req.body;

      const payload = await requestSignPermissions({
        client_id,
        client_secret,
        consent_id,
        redirect_url,
      });

      try {
        if (payload.success) {
          res.status(200).json({
            success: true,
            message: payload.message.data,
          });
        }
      } catch (error) {
        console.error(error);

        res.status(500).json({
          success: false,
          message: error as string,
        });
      }
    })
    .post("/exchange_code_access", async (req, res) => {
      const { client_id, client_secret, code } = req.body;

      const payload = await exchangeCodeAccess({
        client_id,
        client_secret,
        code,
      });

      try {
        if (payload.success) {
          res.status(200).json({
            success: true,
            message: payload.message.data,
          });
        }
      } catch (error) {
        console.error(error);

        res.status(500).json({
          success: false,
          message: error as string,
        });
      }
    })
    .post("/exchange_refresh_token", async (req, res) => {
      const { client_id, client_secret, refresh_token } = req.body;

      const payload = await exchangeRefreshToken({
        client_id,
        client_secret,
        refresh_token,
      });

      try {
        if (payload.success) {
          res.status(200).json({
            success: true,
            message: payload.message.data,
          });
        }
      } catch (error) {
        console.error(error);

        res.status(500).json({
          success: false,
          message: error as string,
        });
      }
    })
    .post("/check_access_token", async (req, res) => {
      const { access_token } = req.body;

      const payload = await checkAccessToken({ access_token });

      try {
        if (payload.success) {
          res.status(200).json({
            success: true,
            message: payload.message.data,
          });
        }
      } catch (error) {
        console.error(error);

        res.status(500).json({
          success: false,
          message: error as string,
        });
      }
    });
})(Router());
