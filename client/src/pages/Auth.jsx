import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CommonForm from '@/components/ui/common-form'
import { signUpFormControls, signInFormControls, initialSignUpFormData, initialSignInFormData } from "../config/index"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { GraduationCap } from 'lucide-react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '@/context/appContext'

const Auth = () => {
    const [activeTab, setActiveTab] = React.useState('signin');

    const { signInFormData, setSignInFormData, setSignUpFormData, signUpFormData
        , handleRegisterUser, handleLoginUser } = useContext(AppContext);

    function handleTabChange(value) {
        setActiveTab(value);
    }

    const checkIfSignInFormIsValid = () => {
        return signInFormData && signInFormData.userEmail && signInFormData.password;
    }

    const checkIfSignUpFormIsValid = () => {
        return signUpFormData && signUpFormData.userName && signUpFormData.userEmail && signUpFormData.password;
    }


    return (
        <div className="flex flex-col min-h-screen" >
            <header className="px-4 lg:px-6 h-14 flex items-center justify-start border-b">
                <Link to={"/"} className="flex items-center justify-center gap-4">
                    <GraduationCap className="h-8 w-8" />
                    <span className="font-extrabold text-xl">LMS LEARN</span>
                </Link>
            </header>
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Tabs
                    value={activeTab}
                    defaultValue="signin"
                    onValueChange={handleTabChange}
                    className="w-full max-w-md"
                >
                    <TabsList className="grid w-full grid-cols-2 border rounded-2xl p-2 mb-4">
                        <TabsTrigger className={`${activeTab === 'signin' ? 'border bg-amber-200 rounded-full' : null} p-2`} value="signin">Sign In</TabsTrigger>
                        <TabsTrigger className={`${activeTab === 'signup' ? 'border bg-amber-200 rounded-full' : null} p-2`} value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin">
                        <Card className="p-6 space-y-4">
                            <CardHeader>
                                <CardTitle>Sign in to your account</CardTitle>
                                <CardDescription>
                                    Enter your email and password to access your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <CommonForm
                                    formControls={signInFormControls}
                                    buttonText={"Sign In"}
                                    formData={signInFormData}
                                    setFormData={setSignInFormData}
                                    isButtonDisabled={!checkIfSignInFormIsValid()}
                                    handleSubmit={handleLoginUser}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="signup">
                        <Card className="p-6 space-y-4">
                            <CardHeader>
                                <CardTitle>Create a new account</CardTitle>
                                <CardDescription>
                                    Enter your details to get started
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <CommonForm
                                    formControls={signUpFormControls}
                                    buttonText={"Sign Up"}
                                    formData={signUpFormData}
                                    setFormData={setSignUpFormData}
                                    isButtonDisabled={!checkIfSignUpFormIsValid()}
                                    handleSubmit={handleRegisterUser}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div >
    )
}

export default Auth
