import React, { useState } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StatusBar,
} from 'react-native';
import { loginUser, LoginResponse } from '../../../services/authService';

interface LoginScreenProps {
    role?: 'customer' | 'business';
    onLogin: (data?: LoginResponse) => void;
    onSignup: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
    role = 'customer',
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
            setGeneralError(error?.message || 'Unable to connect to the server. Please check your internet connection.');
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
                    Login as {role === 'customer' ? 'Customer' : 'Business Owner'}
                </Text>

                {/* Phone Number Input Section */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enter Phone Number</Text>

                    <TextInput
                        style={[
                            styles.input,
                            (!!phoneError || !!generalError) && styles.inputErrorBorder,
                        ]}
                        placeholder="Enter phone number"
                        placeholderTextColor="#94A3B8"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={(text) => {
                            setPhone(text);
                            if (phoneError) setPhoneError('');
                            if (generalError) setGeneralError('');
                        }}
                        maxLength={10}
                        editable={!loading}
                    />

                    {phoneError ? (
                        <Text style={styles.fieldError}>{phoneError}</Text>
                    ) : null}
                </View>

                {/* Password Input Section */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enter Password</Text>

                    <View
                        style={[
                            styles.passwordContainer,
                            (!!passwordError || !!generalError) && styles.inputErrorBorder,
                        ]}
                    >
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Enter password"
                            placeholderTextColor="#94A3B8"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                if (passwordError) setPasswordError('');
                                if (generalError) setGeneralError('');
                            }}
                            editable={!loading}
                        />

                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            disabled={loading}
                        >
                            <Text style={styles.showText}>
                                {showPassword ? 'Hide' : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {passwordError ? (
                        <Text style={styles.fieldError}>{passwordError}</Text>
                    ) : null}
                </View>

                <TouchableOpacity disabled={loading}>
                    <Text style={styles.forgotPassword}>
                        Forgot Password?
                    </Text>
                </TouchableOpacity>

                {generalError ? (
                    <View style={styles.errorBanner}>
                        <Text style={styles.errorBannerIcon}>⚠️</Text>
                        <Text style={styles.errorBannerText}>{generalError}</Text>
                    </View>
                ) : null}

                <TouchableOpacity
                    style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                        <Text style={styles.loginButtonText}>
                            Login
                        </Text>
                    )}
                </TouchableOpacity>
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

    inputContainer: {
        marginBottom: 24,
    },

    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 10,
    },

    input: {
        height: 55,
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#000',
    },

    passwordContainer: {
        height: 55,
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },

    passwordInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        paddingVertical: 0,
    },

    showText: {
        color: '#7B3FF2',
        fontWeight: '600',
    },

    forgotPassword: {
        textAlign: 'right',
        color: '#7B3FF2',
        marginBottom: 30,
        fontWeight: '600',
    },

    loginButton: {
        backgroundColor: '#7B3FF2',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginButtonDisabled: {
        opacity: 0.6,
    },

    inputErrorBorder: {
        borderColor: '#DC2626',
    },

    fieldError: {
        color: '#DC2626',
        fontSize: 13,
        marginTop: 6,
        fontWeight: '500',
    },

    errorBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF2F2',
        borderWidth: 1,
        borderColor: '#FECACA',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 14,
        marginBottom: 20,
    },

    errorBannerIcon: {
        fontSize: 16,
        marginRight: 10,
    },

    errorBannerText: {
        flex: 1,
        color: '#DC2626',
        fontSize: 14,
        fontWeight: '600',
    },

    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
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