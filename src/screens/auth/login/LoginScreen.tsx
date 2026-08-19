import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StatusBar,
} from 'react-native';

interface LoginScreenProps {
    role: 'customer' | 'business';
    onLogin: () => void;
    onSignup: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
    role,
    onLogin,
    onSignup,
}) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone Number</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter phone number"
                        placeholderTextColor="#94A3B8"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                        maxLength={10}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Enter password"
                            placeholderTextColor="#94A3B8"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Text style={styles.showText}>
                                {showPassword ? 'Hide' : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>
                        Forgot Password?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={onLogin}
                >
                    <Text style={styles.loginButtonText}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Don't have an account?
                </Text>

                <TouchableOpacity onPress={onSignup}>
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
        marginBottom: 20,
    },

    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 8,
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