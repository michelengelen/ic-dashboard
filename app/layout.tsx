import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body className="min-h-screen bg-gray-100 text-gray-900">
    <div className="flex">
      <aside className="w-64 bg-white p-5 shadow-md">
        <nav>
          <ul className="space-y-4">
            <li><a href="/" className="text-lg font-semibold">🏠 Home</a></li>
            <li><a href="/dashboard" className="text-lg font-semibold">📊 Dashboard</a></li>
            <li><a href="/login" className="text-lg font-semibold">🔑 Login</a></li>
            <li><a href="/register" className="text-lg font-semibold">📝 Register</a></li>
            <li><a href="/settings" className="text-lg font-semibold">⚙️ Settings</a></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
    </body>
    </html>
  );
}
