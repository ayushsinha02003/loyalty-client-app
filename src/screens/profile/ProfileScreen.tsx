import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

const menuItems = [
    'Edit Profile',
    'Membership',
    'Settings',
    'Help & Support',
    'About Us',
];

const ProfileScreen = () => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            {/* Header */}
            <View style={styles.header}>

                <Image
                    source={{
                        uri: 'https://i.pravatar.cc/150?img=12',
                    }}
                    style={styles.avatar}
                />

                <Text style={styles.name}>Ayush Singh</Text>
                <Text style={styles.email}>ayush@gmail.com</Text>
                <Text style={styles.phone}>+91 98765 43210</Text>
            </View>

            {/* Stats */}

            <View style={styles.statsContainer}>

                <View style={styles.statBox}>
                    <Text style={styles.statTitle}>Total Stamps</Text>
                    <Text style={styles.statValue}>32</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.statBox}>
                    <Text style={styles.statTitle}>Rewards Redeemed</Text>
                    <Text style={styles.statValue}>5</Text>
                </View>

            </View>

            {/* Menu */}

            <View style={styles.menuContainer}>

                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                    >
                        <Text style={styles.menuText}>{item}</Text>

                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.logout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },

    header: {
        backgroundColor: '#6D28D9',
        paddingTop: 60,
        paddingBottom: 35,
        alignItems: 'center',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },

    settingButton: {
        position: 'absolute',
        top: 55,
        right: 20,
    },

    settingIcon: {
        fontSize: 22,
        color: '#fff',
    },

    avatar: {
        width: 95,
        height: 95,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
    },

    name: {
        marginTop: 12,
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
    },

    email: {
        color: '#E9D5FF',
        marginTop: 5,
    },

    phone: {
        color: '#E9D5FF',
        marginTop: 3,
    },

    statsContainer: {
        marginHorizontal: 20,
        marginTop: -28,
        backgroundColor: '#fff',
        borderRadius: 16,
        flexDirection: 'row',
        elevation: 5,
        paddingVertical: 18,
    },

    statBox: {
        flex: 1,
        alignItems: 'center',
    },

    divider: {
        width: 1,
        backgroundColor: '#E5E7EB',
    },

    statTitle: {
        color: '#6B7280',
        fontSize: 13,
    },

    statValue: {
        marginTop: 6,
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
    },

    menuContainer: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 10,
        elevation: 2,
    },

    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },

    menuText: {
        fontSize: 16,
        color: '#111827',
    },

    arrow: {
        fontSize: 20,
        color: '#9CA3AF',
    },

    logout: {
        padding: 20,
    },

    logoutText: {
        color: '#EF4444',
        fontSize: 17,
        fontWeight: '600',
    },
});