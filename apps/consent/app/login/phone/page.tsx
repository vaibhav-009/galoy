import { redirect } from "next/navigation"
import React from "react"

import LoginForm from "./form"

import { hydraClient } from "@/services/hydra"
import Card from "@/app/components/card"
import MainContent from "@/app/components/main-container"
import Logo from "@/app/components/logo"
import Heading from "@/app/components/heading"
import SubHeading from "@/app/components/sub-heading"
import { getSupportedCountryCodes } from "@/app/graphql/queries/get-supported-countries"

interface LoginProps {
  login_challenge: string
}

const Login = async ({ searchParams }: { searchParams: LoginProps }) => {
  const { login_challenge } = searchParams

  if (!login_challenge) {
    throw new Error("Invalid Request")
  }

  const { data: body } = await hydraClient.getOAuth2LoginRequest({
    loginChallenge: login_challenge,
  })

  if (body.skip) {
    const { data: response } = await hydraClient.acceptOAuth2LoginRequest({
      loginChallenge: login_challenge,
      acceptOAuth2LoginRequest: {
        subject: String(body.subject),
      },
    })
    redirect(String(response.redirect_to))
  }

  const countries = await getSupportedCountryCodes()
  if (!countries) {
    throw new Error("Unable to get Countries")
  }

  const countryCodes = countries.map((country) => country.id)

  return (
    <MainContent>
      <Card>
        <Logo />
        <Heading>Sign In with Blink</Heading>
        <SubHeading>Enter your Phone Number to sign in to this Application.</SubHeading>
        <LoginForm countryCodes={countryCodes} login_challenge={login_challenge} />
      </Card>
    </MainContent>
  )
}
export default Login
