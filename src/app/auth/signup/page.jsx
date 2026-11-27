"use client";
import { Description, Radio, RadioGroup } from "@heroui/react";
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
import {
  ArrowLeft,
  Envelope,
  Eye,
  EyeSlash,
  Lock,
  Person,
} from "@gravity-ui/icons";
import { signUp } from "@/app/api/auth/[...all]/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("seeker");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!name.trim() || !email.trim() || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(
          error.message || "Failed to create account. Please try again.",
        );
        return;
      }

      setSuccessMessage("Account created successfully! Redirecting...");
      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1200);
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
              Create an account
            </Card.Title>
            <Card.Description>
              Enter your details below to create your account.
            </Card.Description>
          </Card.Header>

          <Card.Content className="space-y-5 pt-4">
            {/* Error Message */}
            {errorMessage && (
              <Alert status="danger">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Sign up failed</Alert.Title>
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
              {/* Name */}
              <TextField
                name="name"
                isRequired
                isDisabled={loading}
                fullWidth
                value={name}
                onChange={setName}
              >
                <Label>Name</Label>
                <InputGroup variant="secondary">
                  <InputGroup.Prefix>
                    <Person className="h-4 w-4 text-muted" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    type="text"
                    placeholder="Enter your name"
                    autoComplete="name"
                  />
                </InputGroup>
                <FieldError />
              </TextField>

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
                    placeholder="Minimum 8 characters"
                    autoComplete="new-password"
                    minLength={8}
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
              {/* {Role Field} */}
              <div className="flex flex-col gap-4">
                <Label>Subscription plan</Label>
                <RadioGroup
                  defaultValue="seeker"
                  name="role"
                  orientation="horizontal"
                  onChange={(value) => setRole(value)}
                >
                  <Radio value="seeker">
                    <Radio.Content>
                      <Radio.Control>
                        <Radio.Indicator />
                      </Radio.Control>
                      Job Seeker
                    </Radio.Content>
                    <Description>For side projects</Description>
                  </Radio>
                  <Radio value="recruiter">
                    <Radio.Content>
                      <Radio.Control>
                        <Radio.Indicator />
                      </Radio.Control>
                      Recruiter
                    </Radio.Content>
                    <Description>Advanced reporting</Description>
                  </Radio>
                </RadioGroup>
              </div>
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
                    {isPending ? "Creating account..." : "Sign Up"}
                  </>
                )}
              </Button>
            </Form>
          </Card.Content>

          <Card.Footer className="justify-center pt-4">
            <p className="text-sm text-muted">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="font-medium text-accent hover:underline"
              >
                Sign in
              </Link>
            </p>
          </Card.Footer>
        </Card>
      </div>
    </main>
  );
}
