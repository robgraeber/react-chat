defmodule PhoenixChatWeb.ChatRoomChannel do
  use PhoenixChatWeb, :channel
  alias PhoenixChatWeb.Presence

  #Events
  @chat_message "chat:message"
  @user_list "user:list"
  @user_changed "user:changed"
  @user_joined "user:joined"
  @user_quit "user:quit"

  @room_topic "chat_room:lobby"

  def room_topic, do: @room_topic

  def join(@room_topic, payload, socket) do
    if authorized?(payload) do
      Process.flag(:trap_exit, true)
      send(self(), {:after_join, payload})
      {:ok, assign(socket, :username, payload["username"])}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_info({:after_join, payload}, socket) do
    broadcast! socket, @user_joined, payload
    push socket, @user_list, Presence.list(@room_topic)
    Presence.track(socket, socket.assigns.username, %{})
    {:noreply, socket}
  end

  def handle_in(@chat_message, payload, socket) do
    broadcast! socket, @chat_message, payload
    {:noreply, socket}
  end

  def handle_in(@user_changed, payload, socket) do
    Presence.untrack(socket, socket.assigns.username)
    socket = assign(socket, :username, payload["newUsername"])
    Presence.track(socket, socket.assigns.username, %{})
    broadcast! socket, @user_changed, payload
    {:noreply, socket}
  end

  def terminate(_reason, socket) do 
    broadcast! socket, @user_quit, %{username: socket.assigns.username}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
