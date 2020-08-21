import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, FlatList, TouchableOpacity, Text } from 'react-native';

import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(res => {
            setProjects(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    async function addProject() {
        const res = await api.post('projects', {
            title: `React Native ${Date.now()}`,
            owner: "Vinícius"
        });

        setProjects([...projects, res.data]);
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={( { item } ) => (
                        <Text style={styles.project}>{item.title}</Text>
                    )}
                />

                <TouchableOpacity activeOpacity={0.75} style={styles.button} onPress={addProject}>
                    <Text style={styles.buttonText}>Adicionar projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },

    project: {
        color: '#fff',
        fontSize: 25
    },

    button: {
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});