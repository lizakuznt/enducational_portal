export const ProgramSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-2xl text-center font-bold">
        <div className="h-8 w-1/3 mx-auto bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="flex gap-5">
        <div className="flex-1 flex-col gap-2 max-w-[800px]">
          <div className="text-2xl mb-2 text-center">
            <div className="h-7 w-1/4 mx-auto bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="min-h-[200px] text-xl text-center p-4 border border-light-gray rounded-lg">
            <div className="flex flex-col gap-3">
              <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-11/12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-10/12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-9/12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-8/12 mx-auto bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7">
          <div className="h-[50px] w-[200px] bg-light-violet/10 border border-light-gray rounded-2xl relative animate-pulse"></div>
          <div className="h-[50px] w-[200px] bg-light-violet/10 border border-light-gray rounded-2xl relative animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
