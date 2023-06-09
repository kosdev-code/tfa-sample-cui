import "./vd-button.css";

interface VirtualDispenserButtonProps {
  available?: boolean;
  icon?: string;
  id?: string;
  label: string;
  onClick?: () => void;
  borderColor?: string;
  selected?: boolean;
  waveEnabled?: boolean;
  mainFlavorColor?: string;
  flavorName?: string;
  flavorFontColor?: string;
}

interface FlavorWaveProps {
  mainFlavorColor?: string;
  flavorName?: string;
  flavorFontColor?: string;
}
export const FlavorWave: React.FC<FlavorWaveProps> = ({
  flavorFontColor,
  mainFlavorColor,
  flavorName,
}) => (
  <div
    style={{
      position: "absolute",
      zIndex: "99",
      borderRadius: "50%",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      height: 100,
      width: 100,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        color: flavorFontColor,
        height: 20,
        width: 100,
        bottom: 10,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          lineHeight: "11px",
          overflowWrap: "break-word",
          textAlign: "center",
          width: "80%",
        }}
      >
        {flavorName}
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        zIndex: "99",

        top: 60,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <svg viewBox="0 0 258 72" height={50}>
        <path
          fill={mainFlavorColor}
          d="M390,4.3C379.5,6.6,368.4,9,355.2,9c-24.9,0-40.2-9-64.4-9c-23.9,0-41.4,9-64.8,9c-23.1,0-40.8-9-64.6-9c-24.2,0-39.6,9-64.5,9C71.2,9,53.5,0,32.4,0C9.8,0,0,4.5,0,4.5V72h390V4.3"
        />
      </svg>
    </div>
  </div>
);
export const VirtualDispenserButton = ({
  available,
  icon,
  id,
  label,
  onClick,
  borderColor,
  selected,
  waveEnabled,
  mainFlavorColor,
  flavorName,
  flavorFontColor,
}: VirtualDispenserButtonProps) => {
  const encoded = icon ? encodeURI(icon) : "";

  return (
    <div
      id={id}
      className={available ? "vd-img" : "vd-img img-unavailable"}
      style={{
        backgroundImage: `url(${encoded})`,
        backgroundSize: "contain",
        outline: selected ? `12px solid ${borderColor}80` : "",
        outlineOffset: selected ? 0 : 12,
        borderRadius: "50%",
      }}
      onClick={onClick}
    >
      {waveEnabled && (
        <FlavorWave
          flavorFontColor={flavorFontColor}
          flavorName={flavorName}
          mainFlavorColor={mainFlavorColor}
        ></FlavorWave>
      )}
      <div className="vd-label">{icon ? "" : label}</div>
    </div>
  );
};
