import AppLayout from "../../../../../components/AppLayout";

export default function EntriesByDayPage() {
  return (
    <AppLayout title="Entries">
      <div className="mb-24 flex flex-col p-4 gap-4">
        <div className="animate-pulse">
          <div className="mt-5 mb-3 w-28">
            <div className="rounded-md bg-black bg-opacity-10 p-4"></div>
          </div>
          <div className="rounded-2xl p-4 mb-3 bg-black bg-opacity-10">
            <div>
              <div className="h-4 mb-2 bg-black bg-opacity-20 rounded"></div>
              <div className="h-4 mb-2 bg-black bg-opacity-20 rounded"></div>
              <div className="h-4 mb-2 bg-black bg-opacity-20 rounded"></div>
              <div className="h-4 w-2/3 mb-2 bg-black bg-opacity-20 rounded"></div>
            </div>
            <div className="mt-2 flex justify-end items-end">
              <div className="h-4 w-24 mb-1 bg-black bg-opacity-20 rounded"></div>
              <div className="ml-auto mr-3 rounded-md bg-black bg-opacity-20 p-4"></div>
              <div className="rounded-md bg-black bg-opacity-20 p-4"></div>
            </div>
          </div>
          <div className="rounded-2xl p-4 mb-3 bg-black bg-opacity-10">
            <div>
              <div className="h-4 mb-2 bg-black bg-opacity-20 rounded"></div>
              <div className="h-4 mb-2 bg-black bg-opacity-20 rounded"></div>
              <div className="h-4 mb-2 bg-black bg-opacity-20 rounded"></div>
              <div className="h-4 w-2/3 mb-2 bg-black bg-opacity-20 rounded"></div>
            </div>
            <div className="mt-2 flex justify-end items-end">
              <div className="h-4 w-24 mb-1 bg-black bg-opacity-20 rounded"></div>
              <div className="ml-auto mr-3 rounded-md bg-black bg-opacity-20 p-4"></div>
              <div className="rounded-md bg-black bg-opacity-20 p-4"></div>
            </div>
          </div>
          <div className="rounded-2xl p-4 mb-3 bg-black bg-opacity-10">
            <div>
              <div className="h-4 mb-2 bg-black bg-opacity-20 rounded"></div>
              <div className="h-4 mb-2 bg-black bg-opacity-20 rounded"></div>
              <div className="h-4 mb-2 bg-black bg-opacity-20 rounded"></div>
              <div className="h-4 w-2/3 mb-2 bg-black bg-opacity-20 rounded"></div>
            </div>
            <div className="mt-2 flex justify-end items-end">
              <div className="h-4 w-24 mb-1 bg-black bg-opacity-20 rounded"></div>
              <div className="ml-auto mr-3 rounded-md bg-black bg-opacity-20 p-4"></div>
              <div className="rounded-md bg-black bg-opacity-20 p-4"></div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
