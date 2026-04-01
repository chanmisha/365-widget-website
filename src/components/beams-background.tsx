"use client";

export function BeamsBackground({
  children,
}: {
  className?: string;
  children?: React.ReactNode;
  intensity?: string;
}) {
  return (
    <>
      {/* background — pure CSS, covers everything including safe areas */}
      <style>{`
        html, body {
          background: #0a0a0a !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .beams-bg {
          position: fixed;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: #0a0a0a;
          z-index: 0;
        }
        .beams-bg::before,
        .beams-bg::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: drift 20s ease-in-out infinite alternate;
        }
        .beams-bg::before {
          top: 20%;
          left: 10%;
          width: 50%;
          height: 50%;
          background: radial-gradient(circle, hsla(220,100%,70%,0.15), transparent 70%);
        }
        .beams-bg::after {
          bottom: 10%;
          right: 10%;
          width: 45%;
          height: 45%;
          background: radial-gradient(circle, hsla(280,100%,70%,0.12), transparent 70%);
          animation-delay: -10s;
          animation-direction: alternate-reverse;
        }
        .beams-blob1 {
          position: absolute;
          top: 40%;
          left: 50%;
          width: 40%;
          height: 40%;
          border-radius: 50%;
          background: radial-gradient(circle, hsla(200,100%,70%,0.10), transparent 70%);
          filter: blur(80px);
          animation: drift2 25s ease-in-out infinite alternate;
        }
        .beams-blob2 {
          position: absolute;
          top: 10%;
          right: 20%;
          width: 35%;
          height: 35%;
          border-radius: 50%;
          background: radial-gradient(circle, hsla(320,100%,70%,0.08), transparent 70%);
          filter: blur(80px);
          animation: drift 18s ease-in-out infinite alternate-reverse;
        }
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(5%, -8%) scale(1.1); }
          66% { transform: translate(-3%, 5%) scale(0.95); }
          100% { transform: translate(8%, 3%) scale(1.05); }
        }
        @keyframes drift2 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          50% { transform: translate(-10%, 8%) scale(1.15); opacity: 1; }
          100% { transform: translate(5%, -5%) scale(0.9); opacity: 0.7; }
        }
      `}</style>
      <div className="beams-bg">
        <div className="beams-blob1" />
        <div className="beams-blob2" />
      </div>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        {children}
      </div>
    </>
  );
}
