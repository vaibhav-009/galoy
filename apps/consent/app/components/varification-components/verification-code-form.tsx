import React from "react"

import InputComponent from "@/app/components/input-component"
import PrimaryButtonComponent from "@/app/components/button/primary-button-component"

interface VerificationCodeFormProps {
  /* eslint @typescript-eslint/ban-ts-comment: "off" */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formAction: any
  login_challenge: string
  loginId: string
  remember: string
  loginType: string
  value: string
}

const VerificationCodeForm: React.FC<VerificationCodeFormProps> = ({
  formAction,
  login_challenge,
  loginId,
  remember,
  loginType,
  value,
}) => (
  <>
    <h1 id="verification-title" className="text-center mb-4 text-xl font-semibold">
      Enter Verification Code
    </h1>
    <form action={formAction} className="flex flex-col">
      <input type="hidden" name="login_challenge" value={login_challenge} />
      <input type="hidden" name="loginId" value={loginId} />
      <input type="hidden" name="remember" value={remember} />
      <input type="hidden" name="loginType" value={loginType} />
      <input type="hidden" name="value" value={value} />
      <div className="flex flex-col items-center mb-4">
        <p className="text-center text-sm w-60 mb-1">
          The code was sent to your {loginType}{" "}
        </p>
        <span className="font-semibold">{value}</span>
      </div>
      <InputComponent
        type="text"
        id="code"
        name="code"
        placeholder="Enter code here"
        data-testid="verification_code_input"
      />
      <PrimaryButtonComponent data-testid="verification_code_submit_btn" type="submit">
        Submit
      </PrimaryButtonComponent>
    </form>
  </>
)

export default VerificationCodeForm
