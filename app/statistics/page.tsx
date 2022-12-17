import { redirect } from "next/navigation";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default function RedirectToStatisticsByYearPage() {
  return redirect(`/statistics/${dayjs().year()}`);
}
