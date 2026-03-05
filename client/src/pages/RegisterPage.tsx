import { Component as AnimatedLogin } from "@/components/ui/animated-characters-login-page";

interface RegisterPageProps {
  onNavigate: (page: string) => void;
}

export default function RegisterPage({ onNavigate }: RegisterPageProps) {
  return <AnimatedLogin onNavigate={onNavigate} mode="register" />;
}