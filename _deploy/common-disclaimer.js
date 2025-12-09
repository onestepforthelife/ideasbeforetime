// Common Disclaimer Footer - Appears on all pages
// Auto-loads below the footer on every page

(function() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertDisclaimer);
    } else {
        insertDisclaimer();
    }

    function insertDisclaimer() {
        const disclaimerHTML = `
            <div style="background: #f8f9fa; border-top: 3px solid #5a6c7d; padding: 30px 20px; margin-top: 40px; font-family: 'Segoe UI', Arial, sans-serif;">
                <div style="max-width: 1400px; margin: 0 auto;">
                    <div style="background: #fff; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h3 style="color: #5a6c7d; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 24px;">⚠️</span>
                            <span>Important Disclaimer</span>
                        </h3>
                        <p style="color: #555; line-height: 1.6; margin: 0 0 15px 0; font-size: 14px;">
                            <strong>Unforeseen Issues & Liability:</strong> Despite our best efforts and use of advanced technology, unforeseen issues can occur. Technology, AI systems, and third-party services are inherently unpredictable. We cannot guarantee specific outcomes or results.
                        </p>
                        <p style="color: #555; line-height: 1.6; margin: 0 0 15px 0; font-size: 14px;">
                            <strong>No Claims or Blame:</strong> By using our services, you agree to release Ideas Before Time, Amit Kumar, and Onestepforthelife from any claims, demands, damages, or liabilities arising from unforeseen issues, forecasted issues that still occur, service interruptions, data inaccuracies, or any other problems beyond our reasonable control.
                        </p>
                        <p style="color: #555; line-height: 1.6; margin: 0; font-size: 14px;">
                            <strong>Use at Your Own Risk:</strong> You acknowledge that you use our services entirely at your own risk. We provide tools and information to assist you, but we cannot control outcomes. You are responsible for your own decisions and actions.
                        </p>
                        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0; text-align: center;">
                            <a href="disclaimer.html" style="color: #5a6c7d; text-decoration: none; font-weight: 600; font-size: 14px;">
                                📄 Read Full Disclaimer & Terms →
                            </a>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 13px;">
                        © 2025 Amit Kumar / Onestepforthelife. All rights reserved.
                    </div>
                </div>
            </div>
        `;

        // Insert before closing body tag
        document.body.insertAdjacentHTML('beforeend', disclaimerHTML);
    }
})();

