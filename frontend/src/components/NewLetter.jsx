export default function NewLetterBox() {
  return (
    <div className="w-full h-[40vh]  bg-linear-to-l from-[#141414] to-[#0c2025] flex items-center justify-start gap-2.5 flex-col">
      <p className="md:text-[30px] text-[20px] text-[#a5faf7] font-semibold px-5">
        Subscribe now & get 20% off
      </p>
      <p className="md:text-[18px] text-[14px] text-center text-blue-100 font-semibold px-5">
        Subscribe now and enjoy exclusive savings, special deals, and early
        access to new collections.
      </p>
      <form
        onSubmit={() => e.preventDefault()}
        className="w-full h-[30%] md:h-[50%] flex items-center justify-center mt-5 gap-5 px-5"
      >
        <input
          type="text"
          placeholder="Enter Your Email"
          className="placeholder:text-[black] bg-slate-300 w-150 max-w-[60%] h-10 px-5 rounded-lg shadow-sm shadow-black"
          required
        />
        <button
          type="submit"
          className="text-[15px] md:text-[16px] px-2.5 md:px-7.5 py-3 md:py-2.5  hover:bg-slate-500 cursor-pointer bg-[#2e3030c9]  text-white flex items-center justify-center gap-5  border border-[#80808049]  rounded-lg shadow-sm shadow-black"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
