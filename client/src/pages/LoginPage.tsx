import { Component as AnimatedLogin } from "@/components/ui/animated-characters-login-page";

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  return <AnimatedLogin onNavigate={onNavigate} mode="login" />;
}