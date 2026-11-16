import { ImageResponse } from "next/og";
import { professionalContent } from "@/lib/professional-content";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

// Share image, prerendered to /og.png at build. Brand tokens from globals.css: graphite background, sage accent.
export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "#101312",
        color: "#ecefe9",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "64px",
            height: "64px",
            border: "2px solid #b3d6a2",
            color: "#b3d6a2",
            fontSize: "28px",
          }}
        >
          AJ
        </div>
        <div style={{ fontSize: "30px", fontWeight: 600 }}>AJTECH</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{ fontSize: "26px", color: "#b3d6a2", letterSpacing: "2px" }}
        >
          SECURITY ENGINEER · BLOCKCHAIN SECURITY · AI SECURITY RESEARCH
        </div>
        <div style={{ fontSize: "64px", lineHeight: 1.1, maxWidth: "980px" }}>
          {professionalContent.headline}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #343e37",
          paddingTop: "28px",
          fontSize: "24px",
          color: "#a8b2aa",
        }}
      >
        <span>{professionalContent.fullName}</span>
        <span>Smart contract audits · AI red teaming · AppSec</span>
      </div>
    </div>,
    size,
  );
}
