"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Alert,
  Button,
  Card,
  FieldError,
  Form,
  InputGroup,
  Label,
  Spinner,
  TextField,
} from "@heroui/react";
import { ArrowLeft, Envelope, Eye, EyeSlash, Lock } from "@gravity-ui/icons";
import { signIn } from "@/app/api/auth/[...all]/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both your email and password.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(
          error.message || "Invalid email or password. Please try again.",
        );
        return;
      }

      setSuccessMessage("Signed in successfully! Redirecting...");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-4">
        {/* Go back & Home navigation */}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onPress={() => router.back()}
            className="gap-2 px-2 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Button>

          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Back to Home
          </Link>
        </div>

        <Card className="w-full p-2 sm:p-4">
          <Card.Header className="space-y-1">
            <Card.Title className="text-2xl font-bold tracking-tight">
              Welcome back
            </Card.Title>
            <Card.Description>
              Enter your email and password to sign in to your account.
            </Card.Description>
          </Card.Header>

          <Card.Content className="space-y-5 pt-4">
            {/* Error Message */}
            {errorMessage && (
              <Alert status="danger">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Sign in failed</Alert.Title>
                  <Alert.Description>{errorMessage}</Alert.Description>
                </Alert.Content>
              </Alert>
            )}

            {/* Success Message */}
            {successMessage && (
              <Alert status="success">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Success</Alert.Title>
                  <Alert.Description>{successMessage}</Alert.Description>
                </Alert.Content>
              </Alert>
            )}

            <Form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <TextField
                name="email"
                type="email"
                isRequired
                isDisabled={loading}
                fullWidth
                value={email}
                onChange={setEmail}
              >
                <Label>Email</Label>
                <InputGroup variant="secondary">
                  <InputGroup.Prefix>
                    <Envelope className="h-4 w-4 text-muted" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </InputGroup>
                <FieldError />
              </TextField>

              {/* Password */}
              <TextField
                name="password"
                isRequired
                isDisabled={loading}
                fullWidth
                value={password}
                onChange={setPassword}
              >
                <Label>Password</Label>
                <InputGroup variant="secondary">
                  <InputGroup.Prefix>
                    <Lock className="h-4 w-4 text-muted" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <InputGroup.Suffix>
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="cursor-pointer text-muted transition-colors hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeSlash className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </InputGroup.Suffix>
                </InputGroup>
                <FieldError />
              </TextField>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isPending={loading}
                isDisabled={loading}
                className="mt-2"
              >
                {({ isPending }) => (
                  <>
                    {isPending && <Spinner color="current" size="sm" />}
                    {isPending ? "Signing in..." : "Sign In"}
                  </>
                )}
              </Button>
            </Form>
          </Card.Content>

          <Card.Footer className="justify-center pt-4">
            <p className="text-sm text-muted">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-accent hover:underline"
              >
                Sign up
              </Link>
            </p>
          </Card.Footer>
        </Card>
      </div>
    </main>
  );
}
