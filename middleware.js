import {auth} from "@/app/__lib/auth"

export const middleware = auth;

export const config = {
    matcher : ["/account"]
}