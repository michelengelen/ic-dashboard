'use client';

import React, { useEffect, useState } from 'react';

type SettingsProps = {
  userId: string;
}

const Settings = ({ userId }: SettingsProps) => {
  const [settings, setSettings] = useState({ github: true, gitlab: true, bitbucket: true });

  useEffect(() => {
    fetch(`/api/push-settings/get?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setSettings(data || settings));
  }, [userId]);

  const updateSettings = async () => {
    await fetch('/api/push-settings/update', {
      method: 'POST',
      body: JSON.stringify({ userId, ...settings }),
      headers: { 'Content-Type': 'application/json' }
    });
    alert('Einstellungen gespeichert!');
  };

  return (
    <div>
      <h2>Push-Benachrichtigungseinstellungen</h2>
      <label>
        <input type="checkbox" checked={settings.github}
               onChange={() => setSettings({ ...settings, github: !settings.github })}/>
        GitHub
      </label>
      <label>
        <input type="checkbox" checked={settings.gitlab}
               onChange={() => setSettings({ ...settings, gitlab: !settings.gitlab })}/>
        GitLab
      </label>
      <label>
        <input type="checkbox" checked={settings.bitbucket}
               onChange={() => setSettings({ ...settings, bitbucket: !settings.bitbucket })}/>
        Bitbucket
      </label>
      <button onClick={updateSettings}>Speichern</button>
    </div>
  );
};

export default Settings;
