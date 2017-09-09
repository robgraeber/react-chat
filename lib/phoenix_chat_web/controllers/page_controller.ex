defmodule PhoenixChatWeb.PageController do
  use PhoenixChatWeb, :controller
  alias PhoenixChatWeb.ChatRoomChannel
  alias PhoenixChatWeb.Presence

  @username_list Enum.map(1..9999, &("Anon-" <> Integer.to_string(&1)))
  
  def index(conn, _params) do
    render conn, "index.html", chatUsername: getUniqueChatUsername()
  end

  # Gets a unique username from Anon-1 to Anon-9999
  # Shuffles the username list and goes down the list until it finds an unused username.
  defp getUniqueChatUsername do
    presence_list = Presence.list(ChatRoomChannel.room_topic)
    random_username_list = Enum.shuffle(@username_list)
    
    getNextAvailiableUsername(random_username_list, presence_list)
  end

  defp getNextAvailiableUsername(random_username_list, presence_list) do
    getNextAvailiableUsername(random_username_list, presence_list, length(random_username_list), 0)
  end

  defp getNextAvailiableUsername(random_username_list, presence_list, username_list_length, index) when index <= username_list_length - 1 do
    username = Enum.at(random_username_list, index)
    case Map.get(presence_list, username) do
      nil -> username
      _ -> getNextAvailiableUsername(random_username_list, presence_list, username_list_length, index + 1)
    end
  end
  # If somehow there's more than 10000 users at once, just get a random user name which might have overlaps.
  defp getNextAvailiableUsername(random_username_list, presence_list, username_list_length, index) when index > username_list_length - 1 do
    random_number = length(@username_list) + :rand.uniform(100_000)
    "Anon-" <> Integer.to_string(random_number)
  end
end
