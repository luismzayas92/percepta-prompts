import { ImageResponse } from "next/og";

export const alt = "PERCEPTA PROMPTS™";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "90px",
          background:
            "radial-gradient(circle at 60% 20%, #0C1428 0%, #0A0A0B 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 13,
              border: "1.5px solid #D4B483",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
              color: "#D4B483",
            }}
          >
            P
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#FFFFFF",
              fontWeight: 700,
            }}
          >
            PERCEPTA
          </div>
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: -2,
            display: "flex",
            lineHeight: 1.05,
          }}
        >
          PERCEPTA PROMPTS
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#C7CCD4",
            marginTop: 28,
            display: "flex",
          }}
        >
          Diseñamos percepción.
        </div>
      </div>
    ),
    { ...size }
  );
}
