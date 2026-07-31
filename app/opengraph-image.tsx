import { ImageResponse } from "next/og";

export const alt = "PERCEPTA LAB™";
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
            "radial-gradient(circle at 60% 20%, #1A1D3B 0%, #06071A 60%)",
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
              border: "1.5px solid #5E7CE0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
              color: "#5E7CE0",
            }}
          >
            P
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#ECEEF7",
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
            color: "#ECEEF7",
            letterSpacing: -2,
            display: "flex",
            lineHeight: 1.05,
          }}
        >
          PERCEPTA LAB
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#8FA4D4",
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
