"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MenuIcon, MailIcon, PhoneIcon, MapPinIcon, PencilIcon } from "lucide-react"
import { ChatSidebar } from "@/components/chat-sidebar"

// Sample user data
const initialUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, New York, NY 10001",
  bio: "Passionate investor with 5 years of experience in stock market trading. Focused on technology and renewable energy sectors.",
  avatar: "/placeholder.svg?height=100&width=100",
}

export default function Profile() {
  const [userData, setUserData] = useState(initialUserData)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState(userData)

  const handleSaveProfile = () => {
    setUserData(editedData)
    setIsEditing(false)
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <header className="border-b border-gray-200">
          <div className="container flex items-center justify-between h-16 px-4 mx-auto">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <MenuIcon className="w-5 h-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
              <Link href="/">
                <h1 className="text-2xl font-bold">
                  sh<span className="text-black">AI</span>re
                </h1>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Profile</h2>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)}>
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-6 md:flex-row">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                    <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block mb-2 text-sm font-medium">
                            Full Name
                          </label>
                          <Input
                            id="name"
                            value={editedData.name}
                            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium">
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={editedData.email}
                            onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block mb-2 text-sm font-medium">
                            Phone
                          </label>
                          <Input
                            id="phone"
                            value={editedData.phone}
                            onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                          />
                        </div>
                        <div>
                          <label htmlFor="address" className="block mb-2 text-sm font-medium">
                            Address
                          </label>
                          <Input
                            id="address"
                            value={editedData.address}
                            onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                          />
                        </div>
                        <div>
                          <label htmlFor="bio" className="block mb-2 text-sm font-medium">
                            Bio
                          </label>
                          <Textarea
                            id="bio"
                            rows={4}
                            value={editedData.bio}
                            onChange={(e) => setEditedData({ ...editedData, bio: e.target.value })}
                          />
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsEditing(false)
                              setEditedData(userData)
                            }}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleSaveProfile}>Save Changes</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold">{userData.name}</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <MailIcon className="w-4 h-4" />
                            <span>{userData.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <PhoneIcon className="w-4 h-4" />
                            <span>{userData.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPinIcon className="w-4 h-4" />
                            <span>{userData.address}</span>
                          </div>
                        </div>
                        <div className="pt-4 border-t">
                          <h4 className="mb-2 text-lg font-medium">About Me</h4>
                          <p className="text-gray-700">{userData.bio}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings Section */}
            <div className="mt-8">
              <h3 className="mb-4 text-xl font-bold">Account Settings</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Password</h4>
                      <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage your notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Receive updates about your portfolio</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Market Alerts</h4>
                      <p className="text-sm text-gray-500">Get notified about significant market changes</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
