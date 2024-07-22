const SpiralBinding = () => {
  const rings = Array.from({ length: 10 }, (_, i) => (
    <div key={i} className="ring">
      <div className="hole"></div>
    </div>
  ));

  return <div className="spiral-binding">{rings}</div>;
};

export default SpiralBinding;
