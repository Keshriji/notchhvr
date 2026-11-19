// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Notchhvr",
    platforms: [.macOS(.v14)],
    targets: [
        .executableTarget(
            name: "Notchhvr",
            path: "Sources/Notchhvr"
        )
    ]
)
