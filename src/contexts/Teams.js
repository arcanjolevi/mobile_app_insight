import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import api from '../services/api';

export function TeamsProvider ({ children }) {

	const [ refreshing, setRefreshing ] = useState(true);
  const [ teams, setTeams ] = useState([]);

  async function storaTeams(){
    await AsyncStorage.setItem('teams', JSON.stringify(teams));
  }

  async function downloadTeams(){
		setRefreshing(true);
		try {
			const response = await api.get('list/all/teams/data');
      setTeams(response.data);
      storaTeams();
		} catch (e) {
      console.log('Erro ao baixar teams do servidor', e);
      const objStoraged = AsyncStorage.getItem('teams');
      if(objStoraged)
        setTeams(JSON.parse(objStoraged));
		}
		setRefreshing(false);		
	}

  return(
    <TeamContext.Provider value={
    	{ 
        refreshing,
        downloadTeams,
        teamsData: teams
      }
    }>
      {children}
    </TeamContext.Provider>
  );
}

const TeamContext = createContext({
    refreshing: Boolean,
    teamsData: Array,
    downloadTeams: Function
});

export default TeamContext ;