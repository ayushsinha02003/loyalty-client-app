import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    StatusBar,
} from 'react-native';
import { loginUser, LoginResponse } from '../../../services/authService';
import PrimaryInputField from '../../../components/input/PrimaryInputField';
import PrimaryPasswordField from '../../../components/input/PrimaryPasswordField';
import PrimaryButton from '../../../components/button/PrimaryButton';
import PrimaryErrorBanner from '../../../components/common/PrimaryErrorBanner';

interface LoginScreenProps {
    role?: 'customer' | 'business';
    onLogin: (data?: LoginResponse) => void;
    onSignup: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
    role: _role = 'customer',
    onLogin,
    onSignup,
}) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');

    const handleLogin = async () => {
        let hasError = false;

        setPhoneError('');
        setPasswordError('');
        setGeneralError('');

        const trimmedPhone = phone.trim();
        if (!trimmedPhone) {
            setPhoneError('Please enter phone number');
            hasError = true;
        } else if (trimmedPhone.length < 10) {
            setPhoneError('Please enter a valid 10-digit phone number');
            hasError = true;
        }

        if (!password) {
            setPasswordError('Please enter password');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        setLoading(true);

        try {
            const response = await loginUser({
                phone: trimmedPhone,
                password: password,
            });

            if (response.success) {
                onLogin(response);
            } else {
                const rawMessage = response.message || '';
                const lower = rawMessage.toLowerCase();
                if (
                    lower.includes('user not found') ||
                    lower.includes('not found') ||
                    lower.includes('invalid') ||
                    lower.includes('credential') ||
                    lower.includes('password')
                ) {
                    setGeneralError('Incorrect phone no. or password');
                } else {
                    setGeneralError(rawMessage || 'Incorrect phone no. or password');
                }
            }
        } catch (error: any) {
            setGeneralError(
                error?.message ||
                'Unable to connect to the server. Please check your internet connection.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFFFFF"
            />

            <View style={styles.content}>
                <Text style={styles.title}>Welcome Back 👋</Text>

                <Text style={styles.subtitle}>
                    Please sign in to continue
                </Text>

                {/* Phone Number Input */}
                <PrimaryInputField
                    label="Enter Phone Number"
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={(text) => {
                        setPhone(text);
                        if (phoneError) setPhoneError('');
                        if (generalError) setGeneralError('');
                    }}
                    maxLength={10}
                    editable={!loading}
                    error={phoneError}
                    hasError={Boolean(generalError)}
                />

                {/* Password Input */}
                <PrimaryPasswordField
                    label="Enter Password"
                    placeholder="Enter password"
                    value={password}
                    visible={showPassword}
                    onToggle={() => setShowPassword(!showPassword)}
                    onChangeText={(text) => {
                        setPassword(text);
                        if (passwordError) setPasswordError('');
                        if (generalError) setGeneralError('');
                    }}
                    editable={!loading}
                    error={passwordError}
                    hasError={Boolean(generalError)}
                />

                <TouchableOpacity disabled={loading}>
                    <Text style={styles.forgotPassword}>
                        Forgot Password?
                    </Text>
                </TouchableOpacity>

                {/* Error Banner */}
                <PrimaryErrorBanner message={generalError} />

                {/* Login Button */}
                <PrimaryButton
                    title="Login"
                    loading={loading}
                    onPress={handleLogin}
                />
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Don't have an account?
                </Text>

                <TouchableOpacity onPress={onSignup} disabled={loading}>
                    <Text style={styles.signupText}>
                        Create Account
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
    },

    content: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#1E293B',
    },

    subtitle: {
        marginTop: 8,
        fontSize: 16,
        color: '#64748B',
        marginBottom: 40,
    },

    forgotPassword: {
        textAlign: 'right',
        color: '#7B3FF2',
        marginBottom: 30,
        fontWeight: '600',
    },

    footer: {
        paddingBottom: 30,
        alignItems: 'center',
    },

    footerText: {
        color: '#64748B',
        fontSize: 15,
    },

    signupText: {
        marginTop: 8,
        color: '#7B3FF2',
        fontSize: 16,
        fontWeight: '700',
    },
});