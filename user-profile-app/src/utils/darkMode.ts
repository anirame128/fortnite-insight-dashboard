import { supabaseClient } from '../supabaseClient';

export const toggleDarkMode = async (isDarkMode: boolean) => {
  try {
    const { data, error } = await supabaseClient
      .from('users')
      .update({ dark_mode: isDarkMode })
      .eq('id', supabaseClient.auth.user().id);
    if (error) {
      console.error(error);
    } else {
      localStorage.setItem('darkMode', String(isDarkMode));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getDarkMode = async () => {
  try {
    const isDarkMode = localStorage.getItem('darkMode');
    if (isDarkMode === null) {
      const { data, error } = await supabaseClient
        .from('users')
        .select('dark_mode')
        .eq('id', supabaseClient.auth.user().id);
      if (error) {
        console.error(error);
      } else {
        return data[0].dark_mode;
      }
    }
    return isDarkMode === 'true';
  } catch (error) {
    console.error(error);
  }
};