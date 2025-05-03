// 1️⃣ Set ukuran canvas SVG
const width = 500,
  height = 500;

// Buat SVG di dalam #chart-container
const svg = d3
  .select("#chart-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("display", "block")
  .style("margin", "auto"); // Pusatkan SVG

// 2️⃣ Fungsi untuk menggambar lingkaran
function drawCircles(data) {
  const padding = 50; // Jarak antar lingkaran
  const totalCircles = data.length;
  const totalWidth = width - 2 * padding;
  const spacing = totalWidth / (totalCircles - 1);

  const colorScale = d3
    .scaleOrdinal()
    .domain([true, false])
    .range(["blue", "red"]); // Biru: Murah, Merah: Mahal

  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (_, i) => padding + i * spacing)
    .attr("cy", height / 2)
    .attr("r", (d) => (d.size === "large" ? 45 : 25)) // Large = 45px, Small = 25px
    .attr("fill", (d) => colorScale(d.price >= 7.0))
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("transform", "translate(0,0)")
    .style("transition", "transform 0.3s ease-in-out")
    .on("mouseover", function () {
      d3.select(this).attr("transform", "scale(1.1)");
    })
    .on("mouseout", function () {
      d3.select(this).attr("transform", "scale(1)");
    });
}

// 3️⃣ Coba ambil data dari CSV
d3.csv("sandwiches.csv")
  .then((data) => {
    data.forEach((d) => {
      d.price = +d.price; // Konversi harga ke angka
      d.size = d.size.trim(); // Hapus spasi ekstra
    });
    drawCircles(data); // Gambar lingkaran dengan data CSV
  })
  .catch(() => {});
