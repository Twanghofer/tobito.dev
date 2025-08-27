export default function PrivacyPolicy() {
  return (
    <main className="py-12">
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold">
          Privacy Policy – Travo (Alpha Release)
        </h1>
        <p className="text-muted-foreground">Effective Date: 27.08.2025</p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Account Information:</strong> Name, email, password, and
              optional profile details.
            </li>
            <li>
              <strong>Travel Information:</strong> Trips you create, join, or
              save.
            </li>
            <li>
              <strong>Usage Data:</strong> Interactions, error logs, basic
              device information.
            </li>
            <li>
              <strong>Verification Data:</strong> If chosen, passport or
              identity documentation.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Enable app functionality (trip creation, discovery, messaging).
            </li>
            <li>Improve app stability and performance.</li>
            <li>Detect and fix bugs, crashes, and errors.</li>
            <li>Communicate with testers for feedback.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            3. Data Storage and Security
          </h2>
          <p>
            All data is stored and processed securely on <strong>Convex</strong>{" "}
            infrastructure. While we apply safeguards, as this is an alpha
            release, we cannot guarantee production-grade security. Test data
            may be deleted at the end of the testing period.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">4. Sharing of Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              We do <strong>not</strong> sell your personal data.
            </li>
            <li>
              We may share limited data with Convex as our backend service
              provider.
            </li>
            <li>Data may also be shared if required by law.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">5. Third-Party Services</h2>
          <p>
            Travo relies on <strong>Convex, Inc.</strong> for backend hosting,
            authentication, and data storage. Please review Convex’s Privacy
            Policy here:{" "}
            <a
              href="https://convex.dev/legal/privacy"
              className="text-primary underline"
            >
              https://convex.dev/legal/privacy
            </a>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">6. Your Rights</h2>
          <p>
            You may request access to or deletion of your personal data by
            contacting us at{" "}
            <a
              href="mailto:realpeakz.business@gmail.com"
              className="font-mono underline"
            >
              realpeakz.business@gmail.com
            </a>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">7. Changes</h2>
          <p>
            This Privacy Policy may be updated during the alpha phase. We will
            notify testers of significant changes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">8. Contact Us</h2>
          <p>
            If you have questions or concerns, contact us at:{" "}
            <a
              href="mailto:realpeakz.business@gmail.com"
              className="font-mono underline"
            >
              realpeakz.business@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
