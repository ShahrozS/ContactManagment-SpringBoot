
const SpiralBinding = () => {
    const rings = Array.from({ length: 12 }, (_, i) => <div key={i} className="ring"></div>);

    return (
      <div className="spiral-binding">
        {rings}
      </div>
    );
}

export default SpiralBinding