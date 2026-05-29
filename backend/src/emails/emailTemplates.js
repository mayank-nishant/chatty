const APP_NAME = "Chatty";

const escapeHtml = (str) => String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

const sanitizeURL = (url) => {
  try {
    const parsed = new URL(String(url || "").trim());

    return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.href : "#";
  } catch {
    return "#";
  }
};

export function createWelcomeEmailTemplate(name, clientURL) {
  const safeName = escapeHtml(String(name || "User").trim());

  const safeClientURL = sanitizeURL(clientURL);

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <title>Welcome to ${APP_NAME}</title>
    </head>

    <body
      style="
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        font-family: Arial, Helvetica, sans-serif;
        color: #333333;
      "
    >
      <table
        role="presentation"
        width="100%"
        cellspacing="0"
        cellpadding="0"
        style="
          background-color: #f4f4f4;
          padding: 30px 15px;
        "
      >
        <tr>
          <td align="center">

            <table
              role="presentation"
              width="600"
              cellspacing="0"
              cellpadding="0"
              style="
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
              "
            >

              <!-- Header -->
              <tr>
                <td
                  align="center"
                  style="
                    background: linear-gradient(to right, #36D1DC, #5B86E5);
                    padding: 40px 20px;
                  "
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
                    alt="${APP_NAME} Logo"
                    width="80"
                    height="80"
                    style="
                      display: block;
                      border-radius: 50%;
                      background-color: #ffffff;
                      padding: 10px;
                      margin-bottom: 20px;
                    "
                  />

                  <h1
                    style="
                      margin: 0;
                      color: #ffffff;
                      font-size: 30px;
                      font-weight: bold;
                    "
                  >
                    Welcome to ${APP_NAME}!
                  </h1>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 40px 30px;">

                  <p
                    style="
                      margin-top: 0;
                      font-size: 18px;
                      color: #5B86E5;
                    "
                  >
                    <strong>Hello ${safeName},</strong>
                  </p>

                  <p
                    style="
                      font-size: 16px;
                      line-height: 1.7;
                    "
                  >
                    We're excited to have you join ${APP_NAME}.
                    Start chatting with friends and share messages,
                    photos, and more in real-time.
                  </p>

                  <table
                    role="presentation"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    style="
                      background-color: #f8f9fa;
                      border-left: 4px solid #36D1DC;
                      border-radius: 8px;
                      margin: 30px 0;
                    "
                  >
                    <tr>
                      <td style="padding: 25px;">

                        <p
                          style="
                            margin-top: 0;
                            margin-bottom: 15px;
                            font-size: 16px;
                            font-weight: bold;
                          "
                        >
                          Get started:
                        </p>

                        <ul
                          style="
                            padding-left: 20px;
                            margin: 0;
                            line-height: 1.8;
                          "
                        >
                          <li>Set up your profile</li>
                          <li>Connect with friends</li>
                          <li>Start conversations instantly</li>
                          <li>Share media securely</li>
                        </ul>

                      </td>
                    </tr>
                  </table>

                  <div
                    style="
                      text-align: center;
                      margin: 35px 0;
                    "
                  >
                    <a
                      href="${safeClientURL}"
                      target="_blank"
                      rel="noopener noreferrer"
                      style="
                        display: inline-block;
                        background: linear-gradient(to right, #36D1DC, #5B86E5);
                        color: #ffffff;
                        text-decoration: none;
                        padding: 14px 32px;
                        border-radius: 999px;
                        font-size: 16px;
                        font-weight: bold;
                      "
                    >
                      Open ${APP_NAME}
                    </a>
                  </div>

                  <p style="line-height: 1.7;">
                    If you have any questions,
                    feel free to reach out anytime.
                  </p>

                  <p style="margin-bottom: 0;">
                    Best regards,<br />
                    <strong>The ${APP_NAME} Team</strong>
                  </p>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td
                  align="center"
                  style="
                    padding: 25px;
                    background-color: #fafafa;
                    color: #888888;
                    font-size: 12px;
                  "
                >
                  <p style="margin: 0 0 10px;">
                    © 2026 ${APP_NAME}.
                    All rights reserved.
                  </p>

                  <p style="margin: 0;">
                    Built with ❤️ by ${APP_NAME}
                  </p>
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
