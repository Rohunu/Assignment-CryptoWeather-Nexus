import { useRouter } from 'next/router';

export default function CryptoDetail() {
  const router = useRouter();
  const { crypto } = router.query;

  return (
    <div>
      <h1>Crypto: {crypto}</h1>
      <p>Placeholder for crypto data (e.g., BTC, ETH).</p>
    </div>
  );
}