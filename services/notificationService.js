import { supabase } from "../lib/supabase";


export const createNotification = async (notification) => {
    try {
        const { data, error } = await supabase
            .from('notifications')
            .insert(notification)
            .select()
            .single()


        if (error) {
            console.log('Notification error:', error);
            return { success: false, msg: 'Something went wrong!' }
        }

        return { success: true, data: data }

    } catch (error) {
        console.log('Notification error:', error);
        return { success: false, msg: 'Something went wrong!' }
    }

}

export const fetchNotifications = async (receiverId) => {
    try {
        const { data, error } = await supabase
            .from('notifications')
            .select(`
                *,
               sender: senderId(id, name, image)
                `)
            .eq('receiverId', receiverId)
            .order("created_at", { ascending: false})
        


        if (error) {
            console.log('fetchNotification error:', error);
            return { success: false, msg: 'Could not fetch notifications' }
        }

        return { success: true, data: data }

    } catch (error) {
        console.log('fetchNotification error:', error);
        return { success: false, msg: 'Could not fetch notifications' }
    }
}

