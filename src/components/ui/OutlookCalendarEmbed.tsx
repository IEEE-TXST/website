export default function OutlookCalendarEmbed() {
  return (
    <div className="w-full overflow-hidden rounded-2xl shadow-xl border border-black/5">
      <div className="relative w-full h-[700px]">
        <iframe
            title="IEEE TXST Calendar"
            src="https://outlook.office365.com/owa/calendar/aadac4d52f1444c9b4ba4998904a996c@txstate.edu/fd3983da896a49a5a4127210ed47f5896582379463131056200/calendar.html"
            className="absolute inset-0 w-full h-full"
            width="800"
            height="600"
        />
      </div>
    </div>
  );
}
