import React, { createContext, useState, useEffect, useContext } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import api from '../services/api';

import AuthContext from './Auth';

export function AdminProvider ({ children }) {

  const { user, token } = useContext(AuthContext);

  const [ isLoading, setIsLoading ] = useState(false);
  const [ teams, setTeams ] = useState([]);
  const [ users, setUsers ] = useState([]);
  const [ usersWithoutTeam, setUserswithoutTeam ] = useState([]);
  const [ messages, setMessages ] = useState([]);
  const [ refreshing, setRefreshing ] = useState(false);
  const [ prays, setPrays ] = useState([]);
  

  /*
  * Function that request all teams in the server and set the teams variable
  */
  async function downloadTeams(){
    setRefreshing(true);
    const response = await api.get('/list/all/teams');
    setTeams(response.data);
    setRefreshing(false);
  }


  /*
  * function that create a new team in the server
  * receive: 
  *   {
  *     name: "team name here",
  *     insititution: "team institution here",
  *     description: "team description here"
  *   }
  * return: nothing
  */  
  async function createTeam(team){

    const { name, description, institution } = team;

    setRefreshing(true);

    if( name && description && institution){
      try {
        const response = await api.post(`admin/${token}/add/team`, {
          name,
          description,
          institution
        });
      } catch (e) {
        console.log('Erro ao criar nova equipe', e);
      }
    }

    downloadTeams();

    setRefreshing(false);
  }

  /**
   * Function that delete team in the server and in the list teams
   *  
   */
  async function deleteTeam(teamID){
    setRefreshing(true);
    try {
      await api.delete(`/admin/${token}/delete/team/${teamID}`);
    } catch (e) {
      console.log('Erro ao remvoer uma equipe', e);
    }
    
    let v = [];
    teams.forEach( x => {
      if(x._id != teamID)
        v.push(x);
    });
    setTeams(v);
    setRefreshing(false);
  }

  /**
   * Function that download all users data from server
   */
  async function downloadUsers(){
    setRefreshing(true);
    try{
      const response = await api.get('list/all/users');
      setUsers(response.data);
    }catch(e){
      console.log('Erro ao baxar usuario do servidor', e);
    }
    setRefreshing(false);
  }

  /*
  * Function that download all users without team
  */
  async function downloadUsersWithoutTeam(){
    setRefreshing(true);
    try{
      const response = await api.get(`admin/${token}/list/members/without/team`);
      setUserswithoutTeam(response.data);
    }catch(e){
      console.log('Erro ao baixar usuario do servidor', e);
    }
    setRefreshing(false);
  }

  /**
   * Function that assign a team to a member
   */
  async function addTeamToMember(userID, teamID){
    setRefreshing(true);
    try{
      const response = await api.post(`admin/${token}/update/member/team`, {
        teamID,
        userID,
        action:'add'
      });
      downloadTeams();
    }catch(e){
      console.log('Erro atualizar equipte de usuario no servidor', e);
    }
    setRefreshing(false);
  }

  /**
   * Function that remove the team of a member 
   */

  async function removeMemberTeam(userID, teamID){
    setRefreshing(true);
    try{
      const response = await api.post(`admin/${token}/update/member/team`, {
        teamID,
        userID,
        action:'remove'
      });
      downloadTeams();
    }catch(e){
      console.log('Erro atualizar equipte de usuario no servidor', e);
    }
    setRefreshing(false);
  }

  /**
   * Function that modify the team in the server
   */
  async function modifyTeam(teamID, name, description, institution){
    setRefreshing(true);
    try{
      const response = await api.post(`admin/${token}/update/team`, {
        teamID,
        name,
        description,
        institution
      });
      downloadTeams();
    }catch(e){
      console.log('Erro atualizar equipte de usuario no servidor', e);
    }
    setRefreshing(false);
  }

  /*
  * Function that create a new message/news in the server
  */
  async function postNewMessage(title, message){
    setRefreshing(true);
    try{
      const response = await api.post(`admin/${token}/create/news`, {
        title,
        body: message,
        author: user.name        
      });
    }catch(e){
      console.log('Erro ao criar nova mensagem', e);
    }
    downloadMessages();
    setRefreshing(false);
  }

  /*
  * Function that download all messages data froom the server
  */
  async function downloadMessages(){
    setRefreshing(true);
    try{
      const response = await api.get('list/all/news');
      setMessages(response.data);
    }catch(e){
      console.log('Erro ao baixar mensagens', e);
    }
    setRefreshing(false);
  }

  /*
  * Function that delete a message/nes in the server
  */
  async function deleteMessage(ID){
    setRefreshing(true);
    try{
      const response = await api.delete(`/admin/${token}/delete/news/${ID}`);
    }catch(e){
      console.log('Erro ao remover msg', e);
    }
    setRefreshing(false);
    downloadMessages();
  }

  /*
  * Funtion that modify a message in the server
  */
  async function modifyMessage(id, title, body){
    setRefreshing(true);
    try{
      const response = await api.post(`/admin/${token}/modify/news`, {
        title,
        body,
        newsID: id
      });
    }catch(e){
      console.log('Erro ao modificar mensagem', e);
    }
    setRefreshing(false);
    downloadMessages();
  }

  async function downloadPrays(){
    setRefreshing(true);
    try{
      const response = await api.get('list/all/prays');
      setPrays(response.data);
    }catch(e){
      console.log('Erro ao baixar pray plans', e);
    }
    setRefreshing(false);
  }

  async function createNewPrayPlan(title, description, team){
    setRefreshing(true);
    try{
      const response = await api.post(`/admin/${token}/add/pray`, {
        title,
        description,
        team
      });
    }catch(e){
      console.log('Erro ao criar nova pray plan', e);
    }
    downloadPrays();
    setRefreshing(false);
  }

  async function deletePrayPlan(prayID){
    setRefreshing(true);
    try{
      const response = await api.delete(`/admin/${token}/delete/pray/${prayID}`);
    }catch(e){
      console.log('Erro ao remover pray plan', e);
    }
    setRefreshing(false);
    downloadPrays();
  }

  useEffect(() => {
    downloadTeams();
    downloadUsers();
    downloadMessages();
  }, []);



  return(
    <AdminContext.Provider value={
    	{ 
        loading: isLoading,
        teams,
        users,
        usersWithoutTeam,
        messages,
        refreshing,
        prays,
        createTeam,
        deleteTeam,
        downloadUsers,        
        downloadUsersWithoutTeam,
        addTeamToMember,
        removeMemberTeam,
        modifyTeam,
        postNewMessage,        
        downloadMessages,
        deleteMessage,
        modifyMessage,
        downloadTeams,
        downloadPrays,
        createNewPrayPlan,
        deletePrayPlan
      }
    }>
      {children}
    </AdminContext.Provider>
  );
}

const AdminContext = createContext({
    loading: Boolean,
    refreshing: Boolean,
    messages: Array,
    teams: Array,
    users: Array,
    usersWithoutTeam: Array,
    prays: Array,
    addTeamToMember: Function,
    removeMemberTeam: Function,
    modifyTeam: Function,
    postNewMessage: Function,    
    downloadMessages: Function,
    deleteMessage: Function,
    modifyMessage: Function,
    createTeam: Function,
    deleteTeam: Function,
    downloadUsers: Function,
    downloadUsersWithoutTeam: Function,
    downloadTeams: Function,
    downloadPrays: Function,
    createNewPrayPlan: Function,
    deletePrayPlan: Function
});

export default AdminContext ;