"use client";

import { IKContext, IKUpload } from "imagekitio-react";

export default function ImageUploader({ onSuccess }) {
  const publicKey = "public_XgYvQJvLHfzZDUJq+LjqR32lSts=";
  const urlEndpoint = "https://ik.imagekit.io/f6wlyd3dqo";

  const authenticator = async () => {
    const response = await fetch(
      "http://elsaket-store.atwebpages.com/backend/auth.php"
    );
    const data = await response.json();
    return data;
  };

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="border-4 border-red-700"
        fileName="product-image"
        onSuccess={(res) => onSuccess(res.url)}
        onError={(err) => console.log("Error:", err)}
      />
    </IKContext>
  );
}
