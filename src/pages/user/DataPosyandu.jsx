import React, { useState } from "react";
import { Link } from "react-router-dom";
import DummyDataPosyandu from "../../assets/dummy/DummyDataPosyandu";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";

const DataPosyandu = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const filteredData = DummyDataPosyandu.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.kecamatan.toLowerCase().includes(search.toLowerCase()) ||
      item.kelurahan.toLowerCase().includes(search.toLowerCase()) ||
      item.puskesmas.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <section className="bg-[#024CAA]">
        <div className="lg:px-6 xxl:px-72 xl:px-36 md:px-4 sm:px-4 pt-24 pb-10" data-aos="fade-down">
          <div className="breadcrumbs text-base">
            <ul>
              <li>
                <Link to="/" className="hover:text-[#EC8305]">
                  Home
                </Link>
              </li>
              <li>
                <Link className="font-semibold text-white">Data Posyandu di Kota Semarang</Link>
              </li>
            </ul>
          </div>
          <h1 className="text-5xl font-bold pt-6 text-white">
            Data Posyandu di Kota Semarang
          </h1>
        </div>
      </section>

      <section className="bg-white lg:px-6 xxl:px-72 xl:px-36 md:px-4 sm:px-4 pb-8 pt-4 text-black">
        <div className="p-4">
          <div
            className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0"
            data-aos="fade-up"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <label className="mr-2">Tampilkan</label>
              <select
                className="border rounded-sm p-2 bg-white"
                value={entriesPerPage}
                onChange={handleEntriesChange}
              >
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
              </select>
              <span className="ml-2">entri</span>
            </div>
            <div className="flex items-center">
              <label className="mr-2">Cari:</label>
              <input
                type="text"
                className="border rounded-sm p-2 bg-white"
                placeholder="Cari..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto" data-aos="fade-up">
            <table className="min-w-full border-collapse">
              <thead className="bg-[#024CAA] text-white">
                <tr>
                  <th className="border p-2">Nama Posyandu</th>
                  <th className="border p-2">Kecamatan</th>
                  <th className="border p-2">Kelurahan</th>
                  <th className="border p-2">Puskesmas</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={index} className="hover:bg-[#F0F0F0] text-center">
                    <td className="border p-2">{item.nama}</td>
                    <td className="border p-2">{item.kecamatan}</td>
                    <td className="border p-2">{item.kelurahan}</td>
                    <td className="border p-2">{item.puskesmas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="flex flex-col sm:flex-col md:flex-row sm:justify-between items-start md:items-center mt-4 space-y-4 sm:space-y-4 md:space-y-0"
            data-aos="fade-up"
          >
            <p>
              Menampilkan {startIndex + 1} hingga{" "}
              {Math.min(endIndex, filteredData.length)} dari{" "}
              {filteredData.length} entri
            </p>
            <div className="flex justify-center sm:justify-start space-x-2">
              <button
                className="px-3 py-2 bg-[#F0F0F0] hover:bg-[#EC8305] hover:text-white rounded-sm"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Sebelumnya
              </button>
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number}
                  className={`px-3 py-2 rounded-sm ${
                    currentPage === number + 1
                      ? "bg-[#024CAA] text-white hover:bg-[#EC8305]"
                      : "bg-[#F0F0F0] hover:bg-[#EC8305] hover:text-white"
                  }`}
                  onClick={() => setCurrentPage(number + 1)}
                >
                  {number + 1}
                </button>
              ))}

              <button
                className="px-3 py-2 bg-[#F0F0F0] hover:bg-[#EC8305] hover:text-white rounded-sm"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DataPosyandu;
