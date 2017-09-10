defmodule PhoenixChatWeb.PageController do
  use PhoenixChatWeb, :controller
  alias PhoenixChatWeb.ChatRoomChannel
  alias PhoenixChatWeb.Presence

  def index(conn, _params) do
    render conn, "index.html", chatUsername: getUniqueChatUsername()
  end

  # Gets a unique random username from Anon-1 to Anon-9999
  # If the username is in-use, then picks another one randomly.
  # Note: This approach breaks down when the user count approaches 10000.
  defp getUniqueChatUsername do
    random_username = "Anon-" <> Integer.to_string(:rand.uniform(10000) - 1)
    presence_list = Presence.list(ChatRoomChannel.room_topic)
    case Map.get(presence_list, random_username) do
      nil -> random_username
      _ -> getUniqueChatUsername()
    end
  end
end
