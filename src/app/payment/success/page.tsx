// Fallback page: if Universal Link doesn't open the app (app not installed),
// user lands here and gets redirected to App Store.
import { redirect } from "next/navigation";

export default function PaymentSuccessPage() {
  // In production, iOS opens the app directly via Universal Links.
  // This page is shown only when app is not installed — redirect to App Store.
  redirect("https://apps.apple.com/app/id6761760122");
}
